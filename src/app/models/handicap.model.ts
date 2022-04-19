export interface Handicap<T extends Configuration> {
  seniorId: number;
  name : string;
  config: T;
  id?: number;
}

export interface Configuration {
  type: string;
}

export class GlaucomeConfiguration implements Configuration {
  type = "Glaucome";
  radius: number;
  activate_voice: boolean;
  circle_quiz: boolean;

  constructor() {
    this.radius = 0.25;
    this.activate_voice = true;
    this.circle_quiz = true;
  }
}

const CONFIGURATION_CLASSES = [GlaucomeConfiguration];

export function default_handicap_from_string(str: string): Configuration {
  return new (CONFIGURATION_CLASSES.filter(c => c.name.startsWith(str))[0])();
}
