import { FormControl } from '@angular/forms';

export function restrictedWords(words): any {
  return (control: FormControl): {[key: string]: any} => {
    if (!words)
      return undefined;

    const invalidWords = words
      .map(w => control.value.includes(w) ? w : undefined)
      .filter(w => w !== undefined);

    return invalidWords && invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ')}
      : undefined;
  };
}
