import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import IntegrationAutosuggest from './Autocomplete';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 2,
  },
  textField: {
    display: 'flex',
    margin: theme.spacing.unit,
  },
  delBtn: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function EditDialog(props) {
  const {
    classes,
    open,
    expense,
    types,
    categories,
    autocomplete,
    handleRequestClose,
    handleRequestSave,
    handleRequestDelete,
    handleRequestChange,
  } = props;

  const selectTypes = Object.keys(types).map(id =>
    <option value={id} key={id}>{types[id]}</option>);

  const selectCategories = Object.keys(categories).map(id =>
    <option value={id} key={id}>{categories[id]}</option>);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleRequestClose}
        transition={Transition}
      >
        <DialogTitle>Expense</DialogTitle>
        <DialogContent>
          <TextField
            id="date"
            label="Date"
            type="date"
            className={classes.textField}
            onChange={e => handleRequestChange(e, 'date')}
            defaultValue={expense.date}
          />
          <TextField
            autoFocus
            id="cost"
            label="Cost"
            type="number"
            className={classes.textField}
            onChange={e => handleRequestChange(e, 'cost')}
            value={expense.cost}
          />
          <IntegrationAutosuggest
            id="description"
            label="Description"
            onChange={e => handleRequestChange(e, 'description')}
            defaultValue={expense.description}
            suggestions={autocomplete.description}
          />
          <IntegrationAutosuggest
            id="service"
            label="Service"
            onChange={e => handleRequestChange(e, 'service')}
            defaultValue={expense.service}
            suggestions={autocomplete.service}
          />
          <FormControl>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              native
              value={expense.category}
              onChange={e => handleRequestChange(e, 'category')}
              input={<Input id="category" />}
              className={classes.textField}
            >
              {selectCategories}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select
              native
              value={expense.type}
              onChange={e => handleRequestChange(e, 'type')}
              input={<Input id="type" />}
              className={classes.textField}
            >
              {selectTypes}
            </Select>
          </FormControl>
          <TextField
            id="recurrent"
            label="Recurrent Date"
            type="date"
            className={classes.textField}
            onChange={e => handleRequestChange(e, 'recurrent')}
            defaultValue={expense.recurrent}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          {expense.id && <Button
            raised
            onClick={() => handleRequestDelete(expense.id)}
            color="accent"
            className={classes.delBtn}
          >
            Delete
          </Button>}
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleRequestSave(expense)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestSave: PropTypes.func.isRequired,
  handleRequestDelete: PropTypes.func.isRequired,
  handleRequestChange: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    category: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    recurrent: PropTypes.string,
  }).isRequired,
  types: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  autocomplete: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditDialog);
