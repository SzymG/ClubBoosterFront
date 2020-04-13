import { IsLoggedPipe } from './is-logged.pipe';

describe('IsLoggedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLoggedPipe();
    expect(pipe).toBeTruthy();
  });
});
