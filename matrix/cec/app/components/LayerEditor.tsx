
import React from 'react';
import { Layer, LayerType, ConvLayer, PoolLayer, DenseLayer } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface LayerEditorProps {
  layer: Layer;
  onUpdate: (layer: Layer) => void;
  onRemove: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

const LayerEditor: React.FC<LayerEditorProps> = ({ layer, onUpdate, onRemove }) => {
    
  const renderLayerFields = () => {
    switch (layer.type) {
      case LayerType.CONV:
        const conv = layer as ConvLayer;
        return (
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-400">Filters</label>
              <input type="number" value={conv.filters} onChange={e => onUpdate({ ...conv, filters: +e.target.value })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm"/>
            </div>
            <div>
              <label className="text-xs text-gray-400">Kernel</label>
              <input type="number" value={conv.kernelSize} onChange={e => onUpdate({ ...conv, kernelSize: +e.target.value })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm"/>
            </div>
            <div>
              <label className="text-xs text-gray-400">Activation</label>
              <select value={conv.activation} onChange={e => onUpdate({ ...conv, activation: e.target.value as any })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm">
                <option>relu</option>
                <option>sigmoid</option>
                <option>tanh</option>
              </select>
            </div>
          </div>
        );
      case LayerType.POOL:
        const pool = layer as PoolLayer;
        return (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400">Pool Size</label>
              <input type="number" value={pool.poolSize} onChange={e => onUpdate({ ...pool, poolSize: +e.target.value })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm"/>
            </div>
            <div>
              <label className="text-xs text-gray-400">Method</label>
              <select value={pool.method} onChange={e => onUpdate({ ...pool, method: e.target.value as any })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm">
                <option>max</option>
                <option>average</option>
              </select>
            </div>
          </div>
        );
      case LayerType.DENSE:
        const dense = layer as DenseLayer;
        return (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400">Units</label>
              <input type="number" value={dense.units} onChange={e => onUpdate({ ...dense, units: +e.target.value })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm"/>
            </div>
            <div>
              <label className="text-xs text-gray-400">Activation</label>
              <select value={dense.activation} onChange={e => onUpdate({ ...dense, activation: e.target.value as any })} className="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm">
                <option>relu</option>
                <option>sigmoid</option>
                <option>softmax</option>
              </select>
            </div>
          </div>
        );
      case LayerType.FLATTEN:
        return <p className="text-sm text-gray-400 italic">Flattens input for dense layers.</p>;
      default:
        return null;
    }
  };

  const getLayerName = () => {
    switch (layer.type) {
        case LayerType.CONV: return 'Conv2D Layer';
        case LayerType.POOL: return 'Pooling Layer';
        case LayerType.DENSE: return 'Dense Layer';
        case LayerType.FLATTEN: return 'Flatten Layer';
        default: return 'Layer';
    }
  }

  return (
    <div className="bg-gray-700/50 p-3 rounded-md flex items-center gap-3">
        <div className="flex-grow">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-300">{getLayerName()}</h4>
                {layer.type !== LayerType.FLATTEN && (
                    <button onClick={() => onRemove(layer.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                        <TrashIcon />
                    </button>
                )}
            </div>
            {renderLayerFields()}
        </div>
    </div>
  );
};

export default LayerEditor;
   