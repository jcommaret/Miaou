import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  name: string;
  size: number;
  color: string;
}

const Icon: React.FC<IconProps> = ({name, size, color}) => {
  const [IconComponent, setIconComponent] =
    React.useState<React.ReactNode | null>(null);

  React.useEffect(() => {
    const loadIcon = async () => {
      const icon = await MaterialIcons.getImageSource(name, size, color);
      setIconComponent(<MaterialIcons name={name} size={size} color={color} />);
    };
    loadIcon();
  }, [name, size, color]);

  return IconComponent;
};

export default Icon;
