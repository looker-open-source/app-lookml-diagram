const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

test('no data', () => {
  expect([]).toEqual([]);
});
