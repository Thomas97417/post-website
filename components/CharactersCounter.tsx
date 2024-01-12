"use client"
import React, { ReactNode, createContext, useContext, useState } from 'react';

// Create a context
type TextContextType = {
  text: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextContext = createContext<TextContextType>({
  text: '',
  handleInputChange: () => {},
});

// Create a provider component
export const TextProvider = ({children}: {children: ReactNode})=> {
  const [text, setText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  return (
    <TextContext.Provider value={{ text, handleInputChange }}>
      {children}
    </TextContext.Provider>
  );
};

// Create a hook to use the context
export const useText = () => useContext(TextContext);

export const CharactersTextArea = () => {
  const { text, handleInputChange } = useText();

  return (
    <>
      <textarea 
        placeholder='Start a thread...'
        className='bg-transparent focus:outline-none w-full resize-none h-2/3 text-sm text-gray-400'
        value={text}
        onChange={handleInputChange}
        name='content'
      />
    </>
  );
};

export const CharactersCounter = () => {
  const { text } = useText()

  return <p className='text-sm font-light text-gray-400'>Character count: {text.length}</p>
}
