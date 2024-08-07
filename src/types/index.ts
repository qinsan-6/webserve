export interface GetOption {
  module: string;
  start?: number;
  num?: number;
  status?: 0 | 1 | 2; //0 未使用 1正在使用 2全部
}
export type Option = {
  start: number;
  num: number;
  status: 0 | 1 | 2; //0 未使用 1正在使用 2全部
};

export interface ArrayInterface {
  name?: string;
  describe?: string;
  inuse?: boolean;
  module: string;
  pos: number;
}

export type ArrayOption = {
  id: string;
  src: string;
  describe: string;
  count: number;
  inuse: boolean;
  name: string;
};

export type ModifyOption = {
  name?: string;
  src?: string;
  describe?: string;
  inuse?: number;
  pos?: number;
  layout?: string;
};

export interface ModifyMajor {
  id: string;
  name?: string;
  content?: string;
  question?: {
    type: "add" | "delete";
    value: string;
  };
}

export type LayoutInfo = {
  name: string;
  id: string;
  card: Array<LayoutCard>
};

export type LayoutCard ={
    presrc: string;
    text: string;
    dirction: LayoutDir;
    aniName: string;
    style: LayoutStyle;
}

export type LayoutDir = 'left'| 'right'|'top'|'bottom'

export type LayoutStyle = {
  width: number;
  height: number;
  left: number;
  top: number;
  rotateZ: number;
};
