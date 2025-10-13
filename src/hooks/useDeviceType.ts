import { useEffect, useState } from "react";

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';

export function useDeviceType(): { device: DeviceType; orientation: Orientation } {
  const getDevice = () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getOrientation = () =>
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

  const [device, setDevice] = useState<DeviceType>(getDevice);
  const [orientation, setOrientation] = useState<Orientation>(getOrientation);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDevice());
      setOrientation(getOrientation());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { device, orientation };
}