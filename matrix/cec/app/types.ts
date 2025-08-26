
export enum LayerType {
  CONV = 'conv',
  POOL = 'pool',
  FLATTEN = 'flatten',
  DENSE = 'dense',
}

export interface ConvLayer {
  id: string;
  type: LayerType.CONV;
  filters: number;
  kernelSize: number;
  activation: 'relu' | 'sigmoid' | 'tanh';
}

export interface PoolLayer {
  id: string;
  type: LayerType.POOL;
  poolSize: number;
  method: 'max' | 'average';
}

export interface FlattenLayer {
  id: string;
  type: LayerType.FLATTEN;
}

export interface DenseLayer {
  id: string;
  type: LayerType.DENSE;
  units: number;
  activation: 'relu' | 'sigmoid' | 'softmax';
}

export type Layer = ConvLayer | PoolLayer | FlattenLayer | DenseLayer;

export interface CNNConfig {
  inputShape: {
    width: number;
    height: number;
    channels: number;
  };
  layers: Layer[];
  learningRate: number;
  optimizer: 'Adam' | 'SGD' | 'RMSprop';
}
   