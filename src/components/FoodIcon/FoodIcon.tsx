import React, { useEffect, useState } from 'react';
import './FoodIcon.scss';
import { foodIcons } from '../../utils/iconsMappings';

type Props = {
  src: string
}

const FoodIcon: React.FC<Props> = (props: Props) => {

  const [errored, setErrored] = useState(false);
  const [src, setSrc] = useState('');
  useEffect(() => {
    let image = '';
    const iconName = foodIcons[props.src] || '';
    try {
      image = require(`../../icons/${iconName}.svg`).default;
    } catch (error) {
    }
    setSrc(image);

    return () => {

    }
  }, [props.src])


  const fallbackSrc = require(`../../icons/item.svg`).default;

  const onError = () => {
    if (!errored) {
      setErrored(true);
      setSrc(fallbackSrc);
    }
  }
  return (
    <img
      src={src}
      height='20'
      style={{marginRight:5}} 
      onError={onError}
      alt="."
    />
  )
};

export default FoodIcon;
