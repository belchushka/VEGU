import { setCourses } from "@box/entities";

export function declOfNum(n: number, text_forms: Array<string>): string {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

export const localeHours = (val: number) =>
  declOfNum(val, ["час", "часа", "часов"]);

export const switchItems = (
  arr: Array<any>,
  from?: number,
  to?: number
): Array<any> | boolean => {
  const items = Array.from(arr);
  if (typeof from !== "undefined" && typeof to !== "undefined") {
    const [recordedItem] = items.splice(from, 1);
    items.splice(to, 0, recordedItem);
    return items;
  }
  return false;
};

export function shuffle(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
