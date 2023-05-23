import * as React from "react"
import {Button, Card, TextArea, TextField, Widget, WidgetContainer, WidgetHeader, WidgetTable} from "@duik/it";
import { consonants } from '../lib/graphemes'
import {useState} from "react";
import {CONSONANT_REGEX} from "../lib/utils/regexp";

console.log('consonants', CONSONANT_REGEX)

const IndexPage = () => {
  const [text, setText] = useState('និគ្គហិត');
  console.log(text)
  return (
    <main>
      <WidgetContainer>
        <TextArea label="Khmer Text" value={text} onChange={event => setText(event.target.value)} />
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