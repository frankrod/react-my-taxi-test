import React from 'react';

export interface CardProps {
  title: string;
  imgSrc: string;
}

const Card: React.FunctionComponent<CardProps> = ({
  title,
  imgSrc,
  children,
}) => {
  return (
    <div className="card">
      <div className="content">
        <img src={imgSrc} alt="logo" />
        <p>{title}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
