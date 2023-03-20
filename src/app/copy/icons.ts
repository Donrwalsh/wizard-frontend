export const focusMove = '/assets/icons/move-focus.png';
export const learnMove = '/assets/icons/move-learn.png';
export const castMove = '/assets/icons/move-cast.png';
export const missionMove = '/assets/icons/move-mission.png';

export const basicManaResource = '/assets/icons/resource-basic-mana.png';
export const basicScrollsResource = '/assets/icons/resource-basic-scrolls.png';

export function parseText(text: string) {
  return text
    .replace('{focus}', "<img class='move-icon' src='" + focusMove + "' />")
    .replace('{learn}', "<img class='move-icon' src='" + learnMove + "' />")
    .replace('{cast}', "<img class='move-icon' src='" + castMove + "' />")
    .replace('{mission}', "<img class='move-icon' src='" + missionMove + "' />")
    .replace(
      '{basic mana}',
      "<img class='move-icon' src='" + basicManaResource + "' />"
    )
    .replace(
      '{basic scrolls}',
      "<img class='move-icon' src='" + basicScrollsResource + "' />"
    );
}
