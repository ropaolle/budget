import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, label, ...other } = inputProps;
  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      label={label}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { /* query, */ isHighlighted }) {
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        <span>{suggestion.label}</span>
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, suggestions) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp(escapedValue, 'i');
  return suggestions.filter(suggestion => regex.test(suggestion.label));
}

const styles = theme => ({
  container: {
    // flexGrow: 1,
    display: 'flex',
    margin: 8,
    position: 'relative',
    zIndex: 10,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class IntegrationAutosuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      suggestions: [],
    };
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.suggestions),
    });
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    this.props.onChange({ target: { value: newValue } });
  }

  render() {
    const { classes, label } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          label,
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
};

IntegrationAutosuggest.defaultProps = {
  defaultValue: '',
  label: '',
};

export default withStyles(styles)(IntegrationAutosuggest);
