import { NullsPipe } from './nulls.pipe';

describe('NullsPipe', () => {
  it('create an instance', () => {
    const pipe = new NullsPipe();
    expect(pipe).toBeTruthy();
  });
});
