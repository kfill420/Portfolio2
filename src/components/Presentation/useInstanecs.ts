import { useContext } from 'react';
import { InstancesContext } from './InstancesContext';
import type { InstancedComponents } from './InstancesContext';

export function useInstances(): InstancedComponents {
  const context = useContext(InstancesContext);
  if (!context) throw new Error('useInstances must be used within <Instances>');
  return context;
}