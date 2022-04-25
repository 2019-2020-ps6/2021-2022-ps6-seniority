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
  fontSize: number;

  constructor() {
    this.radius = 0.25;
    this.activate_voice = true;
    this.circle_quiz = true;
    this.fontSize = 16;
  }
}

export class DaltonismeConfiguration implements Configuration {
  type = "Daltonisme";
  trueColor: string;
  falseColor: string;
  textColor: string;
  boldAnswers: boolean;
  fontSize: number;
  activate_voice: boolean;

  constructor() {
    this.activate_voice = true;
    this.trueColor = "lightblue";
    this.falseColor = "grey";
    this.textColor = "black";
    this.boldAnswers = true;
    this.fontSize = 16;
  }
}

const CONFIGURATION_CLASSES = [GlaucomeConfiguration, DaltonismeConfiguration];

export function default_handicap_from_string(str: string): Configuration {
  return new (CONFIGURATION_CLASSES.filter(c => c.name.startsWith(str))[0])();
}
