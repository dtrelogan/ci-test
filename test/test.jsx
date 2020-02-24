import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestForm from '../index.js';
import assert from 'assert';
import { rff } from 'react-formstate-fp';


let formstate, form;

const html = ReactDOMServer.renderToString(
  <html lang='en'>
    <head>
      <meta charSet='utf-8'/>
      <title>CI Test</title>
    </head>
    <body>
      <TestForm
        model={{test: 'hello world!'}}
        grabFormstate={fs => formstate = fs}
        grabForm={fm => form = fm}
      />
    </body>
  </html>
);

describe('App', () => {
  it('injects the model data', () => {
    assert.equal('hello world!', rff.getValue(formstate, 'test'));
  });
  it('validates onChange', () => {
    assert.equal(false, rff.isValidated(formstate, 'test'));
    form.setFormstate = (f) => {
      formstate = f(formstate);
    };
    rff.handleChange(form, 'a', rff.getId(formstate, 'test'));
    assert.equal('a', rff.getValue(formstate, 'test'));
    assert.equal(true, rff.isValidated(formstate, 'test'));
    assert.equal(true, rff.isInvalid(formstate, 'test'));
    assert.equal('Test must be at least 8 characters.', rff.getMessage(formstate, 'test'));
  });
});
