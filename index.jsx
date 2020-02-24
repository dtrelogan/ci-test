import React, { useState } from 'react';
import { rff, FormScope, FormField } from 'react-formstate-fp';
import { library as validation } from 'react-formstate-validation';


function Input({label, value, help, onChange, onBlur}) {
  return (
    <div>
      <div>{label}</div>
      <input type='text' value={value} onChange={onChange} onBlur={onBlur}/>
      <div>{help}</div>
    </div>
  );
}


function RffInput({formstate, modelKey, form, ...other}) {
  return (
    <Input
      value={rff.getValue(formstate, modelKey)}
      help={form.calculatePrimed(formstate, modelKey) && rff.getMessage(formstate, modelKey)}
      onChange={e => rff.handleChange(form, e.target.value, rff.getId(formstate, modelKey))}
      onBlur={() => rff.handleBlur(form, rff.getId(formstate, modelKey))}
      {...other}
      />
  );
}


export default function TestForm({model, grabFormstate, grabForm}) {

  const [formstate, setFormstate] = useState(() => rff.initializeFormstate(model));

  const form = {
    setFormstate,
    adaptors: [RffInput],
    calculatePrimed: rff.primeOnChange
  };

  grabFormstate(formstate);
  grabForm(form);

  return (
    <form onSubmit={e => handleSubmit(e, form)}>
      <FormScope formstate={formstate} form={form}>
        <FormField name='test' required validate={validateTest}>
          <RffInput label='Test'/>
        </FormField>
      </FormScope>
      <input type='submit' value='Submit' disabled={rff.isPrimedModelInvalid(formstate, form.calculatePrimed)}/>
    </form>
  );
}


function validateTest(value) {
  if (value.length < 8) {
    return 'Test must be at least 8 characters.';
  }
}


function handleSubmit(e, form) {
  e.preventDefault();
  form.setFormstate(fs => {
    fs = rff.validateForm(fs, form);
    if (rff.isModelValid(fs)) {
      alert(JSON.stringify(fs.model));
    }
    return fs;
  });
}
