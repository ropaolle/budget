import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, CustomInput, Row, Col, Button } from 'reactstrap';
import XLSX from 'xlsx';
import format from 'date-fns/format';
import { SelectField, DateField, CostField, CreatableSelectField } from '../dialogs/fields';
// import { apiGet } from '../lib/api';

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
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.openFile = this.openFile.bind(this);
  }

  handleFieldChange({ index, value, field }) {
    console.log(index, value, field);

    this.setState(prevState => {
      const fieldValue = typeof value === 'object' ? value && value.value : value;
      const relatedField = field === 'service' && value && value.category ? { category: value.category } : {};
      const expenses = prevState.expenses.slice();
      const row = { ...expenses[index], [field]: fieldValue, ...relatedField };
      expenses.splice(index, 1, row);

      return { expenses };
    });
  }

  // await apiPost('/expenses', fields);

  /*
{ _id: '5c4d962fc5a01b3430cdcefb',
  cost: '2237',
  description: 'Hemförsäkring',
  service: '5c4d95e3a202431a548a96d4',
  type: '5c4d7368b648553f0c6f6323',
  date: '2017-01-01',
  category: '5c4d7368b648553f0c6f6317',
  recurring: '',
  id: '5c4d962fc5a01b3430cdcefb' }
  */

  async openFile(file) {
    const sheet = await loadFile(file).catch(err => console.error(err));
    const expenses = sheet.map(({ date, description, text, cost }) => ({
      date: format(date, 'YYYY-MM-DD'),
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
    const { filename, expenses } = this.state;
    const { settings } = this.props;
    console.log(filename);
    console.log(expenses);

    const list =
      settings &&
      expenses.map(({ cost, date, type, description, service, category, text }, index) => {
        const { services, categories, types, autocomplete } = settings;
        return (
          <Row form key={index}>
            <Col md={1}>
              <DateField
                id="date"
                value={date}
                // invalid={!date}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={1}>
              <CostField
                id="cost"
                value={cost}
                // invalid={!cost}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={3}>
              <CreatableSelectField
                id="description"
                value={description}
                invalid={!description}
                isClearable
                options={autocomplete}
                onChange={field => this.handleFieldChange({ ...field, index })}
              />
            </Col>
            <Col md={4}>{text}</Col>
            <Col md={1}>
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
              Ta bort kolumnerna, <code>Valutadatum</code>, <code>Verifikationsnummer</code> och <code>Saldo</code>.
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

                  <Button color="primary" disabled onClick={() => this.toggle('close')}>
                    Importera värden
                  </Button>
                </Row>
              </Form>
            </li>
          </ol>

          <h3>Kostnader</h3>
          {settings && (
            <Form>
              <Row form>
                <Col md={2}>Datum</Col>
                <Col md={2}>Kostnad</Col>
                <Col md={2}>Beskrivning</Col>
                <Col md={3}>Info</Col>
                <Col md={1}>Tjänst</Col>
                <Col md={1}>Kategori</Col>
                <Col md={1}>Typ</Col>
              </Row>
              {list}
              {/* {row(settings)} */}
            </Form>
          )}
        </Container>
      </div>
    );
  }
}

export default Import;
