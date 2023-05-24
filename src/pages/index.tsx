import * as React from "react"
import {
  Button,
  ButtonGroup,
  Card,
  TextArea,
  TextField,
  Widget,
  WidgetContainer,
  WidgetHeader,
  WidgetTable,
} from '@duik/it';
import { consonants } from '../lib/graphemes'
import { FC, useState } from 'react';
import {CONSONANT_REGEX} from "../lib/utils/regexp";
import {Word} from "../lib";
import { tr } from '../legacy/km-translit/km-translit';

console.log('consonants', CONSONANT_REGEX)

interface WordContainerProps {
  word: Word;
}

const WordContainer: FC<WordContainerProps> = (props) => {
  const { word } = props;
  return <div>
    <ButtonGroup>
      {word.characters.map((ch, index) => <Button key={index} square transparent>{ch}</Button>)}
    </ButtonGroup>
  </div>
}

const IndexPage = () => {
  const [text, setText] = useState('និគ្គហិត');
  const word = new Word(text);
  console.debug(word);
  console.debug(word.syllables);
  // console.log(111, tr(text, '', ''))
  return (
    <main>
      <WidgetContainer>
        <TextArea label="Khmer Text" value={text} onChange={event => setText(event.target.value)} style={{ fontSize: '1.2em' }} />
        <WordContainer word={word} />
        {/*<Widget>*/}
        {/*  <WidgetHeader><h3>Consonants</h3></WidgetHeader>*/}
        {/*  <WidgetTable>*/}
        {/*    <tr>*/}
        {/*      <th style={{ width: 100 }}>Grapheme</th>*/}
        {/*      <th style={{ width: 100 }}>Name</th>*/}
        {/*      <th style={{ width: 100 }}>Series</th>*/}
        {/*      <th>Code Points</th>*/}
        {/*    </tr>*/}
        {/*    {Object.values(consonants).sort((a, b) => a.Code - b.Code).map(cls => <tr key={cls.name.toLowerCase()}>*/}
        {/*      <td>{String.fromCodePoint(cls.Code)}</td>*/}
        {/*      <td>{cls.name}</td>*/}
        {/*      <td>{cls.Series}</td>*/}
        {/*      <td>U + {cls.Code.toString(16).toUpperCase()}</td>*/}
        {/*    </tr>)}*/}
        {/*  </WidgetTable>*/}
        {/*</Widget>*/}
      </WidgetContainer>
      <div>

      </div>

    </main>
  )
}

export default IndexPage

export const Head = () => <title>hghghfHome Page</title>
