type RootVariables = {
  cursor: 'pointer' | 'none';
};

export const changeRootVariable = <Property extends keyof RootVariables>(
  property: Property,
  value: RootVariables[Property],
) => {
  document.documentElement.style.setProperty(`--${property}`, value);
};
