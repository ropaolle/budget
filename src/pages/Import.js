import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, CustomInput, Row, Col, Button } from 'reactstrap';
import XLSX from 'xlsx';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import { SelectField, DateField, CostField, CreatableSelectField } from '../dialogs/fields';
import { AppAlert } from '../components';
import { apiPost } from '../lib/api';

const loadFile = async file =>
  new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        // https://github.com/SheetJS/js-xlsx/wiki/Reading-XLSX-from-FileReader.readAsArrayBuffer()
        // Convert to binary file
        let binary = '';
        const bytes = new Uint8Array(fileReader.result);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        // Load file and convert to json
        const workbook = XLSX.read(binary, { type: 'binary', cellDates: true, cellStyles: true });
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        resolve(sheet);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      reject(err);
    }
  });

class Import extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
      expenses: [],
      alert: null,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.openFile = this.openFile.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  handleFieldChange({ index, value, field }) {
    this.setState(prevState => {
      const fieldValue = typeof value === 'object' ? value && value.value : value;
      const relatedField = field === 'service' && value && value.category ? { category: value.category } : {};
      const expenses = prevState.expenses.slice();
      const row = { ...expenses[index], [field]: fieldValue, ...relatedField };
      expenses.splice(index, 1, row);

      return { expenses };
    });
  }

  async handleImport() {
    const { expenses } = this.state;
    try {
      const { data } = await apiPost('/expenses/import', expenses);
      this.setState({ alert: { color: 'success', message: `${data.count} kostnader importerades.` } });
    } catch (err) {
      this.setState({ alert: { color: 'danger', message: err.message } });
    }
  }

  async openFile(file) {
    const sheet = await loadFile(file).catch(err => console.error(err));
    const expenses = sheet.map(({ date, description, text, cost }) => ({
      date1: date,
      // INFO: Fel datum Efter Excel-konvertering (- 1 dag).
      date: format(addDays(date, 1), 'YYYY-MM-DD'),
      cost: Math.abs(cost),
      description: null,
      type: Number(cost < 0) ? '5c4d7368b648553f0c6f631f' : null,
      service: null,
      category: null,
      text: `${description}${text ? ` (${text})` : ''}`,
    }));

    this.setState({ expenses, filename: file.name });
  }

  render() {
    const { filename, expenses, alert } = this.state;
    const { settings } = this.props;

    const invalid =
      expenses.length === 0 ||
      expenses.some(e => {
        const copy = { ...e };
        delete copy.text;
        return Object.values(copy).some(v => !v);
      });

    const list =
      settings &&
      expenses.map(({ cost, date, type, description, service, category, text }, index) => {
        const { services, categories, types, autocomplete } = settings;
        return (
          <Row form key={index}>
            <Col md={2}>
              <DateField
                id="date"
                value={date}
                invalid={!date}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={2}>
              <CostField
                id="cost"
                value={cost}
                invalid={!cost}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={4}>
              <CreatableSelectField
                id="description"
                value={description}
                defaultValue={{ label: text, value: 'dummy-string' }}
                invalid={!description}
                isClearable
                options={autocomplete}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={2}>
              <CreatableSelectField
                id="service"
                value={service}
                invalid={!service}
                options={services}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={1}>
              <CreatableSelectField
                id="category"
                value={category}
                invalid={!category}
                options={categories}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={1}>
              <SelectField
                id="type"
                value={type}
                invalid={!type}
                options={types}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
          </Row>
        );
      });

    return (
      <div className="page import">
        <Container fluid>
          <h1>Importera kostnader</h1>
          <ol>
            <li>Ladda ner Excelfil från SEB.</li>
            <li>
              Följande kolumner krävs <code>date</code>, <code>description</code>, <code>text</code> och{' '}
              <code>cost</code>.
            </li>
            <li>Sortera på belopp och ta bort alla intäckter utom lön.</li>
            <li>Sortera på text/datum och uppdatera.</li>
            <li>
              Välj Excelfil
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label hidden for="importFile">
                        Ladda fil som ska importeras
                      </Label>
                      <CustomInput
                        type="file"
                        onChange={e => this.openFile(e.target.files[0])}
                        id="importFile"
                        name="importFile"
                        label={filename}
                      />
                    </FormGroup>
                  </Col>

                  <Button color="primary" disabled={invalid} onClick={this.handleImport}>
                    Importera värden
                  </Button>
                </Row>
              </Form>
            </li>
          </ol>

          <AppAlert alert={alert} />

          <h3>Kostnader</h3>
          {settings && (
            <Form>
              <Row form>
                <Col md={2}>Datum</Col>
                <Col md={2}>Kostnad</Col>
                <Col md={4}>Beskrivning</Col>
                <Col md={2}>Tjänst</Col>
                <Col md={1}>Kategori</Col>
                <Col md={1}>Typ</Col>
              </Row>
              {list}
            </Form>
          )}
        </Container>
      </div>
    );
  }
}

export default Import;
