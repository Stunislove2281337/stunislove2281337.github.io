const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(
  path.resolve(__dirname, '../index.html'),
  'utf8'
);

describe('Feedback Form Tests', () => {

  let document;
  let window;

  beforeEach(() => {
    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable"
    });

    window = dom.window;
    document = window.document;
  });

  test('Form should exist', () => {
    const form = document.getElementById('feedbackForm');
    expect(form).not.toBeNull();
  });

  test('Message should be added after submit', () => {

    document.getElementById('name').value = 'John';
    document.getElementById('message').value = 'Hello';

    const form = document.getElementById('feedbackForm');

    form.dispatchEvent(new window.Event('submit'));

    const items = document.querySelectorAll('#messageList li');

    expect(items.length).toBe(999);
    expect(items[0].textContent).toBe('John: Hello');
  });

});