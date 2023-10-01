/* eslint-disable jest/expect-expect */
import doT from '@tps/templates/template-engine';

describe('defines', () => {
  describe('without parameters', () => {
    it('should render define', () => {
      testDef('{{##def.tmp:<div>{{!tps.foo}}</div>#}}{{#def.tmp}}');
    });

    it('should render define if it is passed to doT.compile', () => {
      testDef('{{#def.tmp}}', { tmp: '<div>{{!tps.foo}}</div>' });
    });
  });

  describe('with parameters', () => {
    it('should render define', () => {
      testDef(
        '{{##def.tmp:foo:<div>{{!foo}}</div>#}}{{ var bar = tps.foo; }}{{# def.tmp:bar }}'
      );
    });
  });

  function testDef(tmpl, defines) {
    const fn = doT.compile(tmpl, defines);
    expect(fn({ foo: 'http' })).toBe('<div>http</div>');
    expect(fn({ foo: 'http://abc.com' })).toBe(
      '<div>http:&#47;&#47;abc.com</div>'
    );
    expect(fn({})).toBe('<div></div>');
  }
});
