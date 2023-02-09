import React from 'react';

export default function ExternalComponent(props: any) {
  return (
    <section>
      External component with {props.name} is mounted!
      <br />
      Passed props from Parent
      <div style={{ color: 'red' }}>{props.customProp1}</div>
    </section>
  );
}
