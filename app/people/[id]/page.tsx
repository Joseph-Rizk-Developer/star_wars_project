import React from "react";

interface Props {
  params: { id: string };
}

const SelectedCharacter = ({ params: { id } }: Props) => {
  return <div>SelectedCharacter</div>;
};

export default SelectedCharacter;
