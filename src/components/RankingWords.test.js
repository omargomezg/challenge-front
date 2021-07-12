import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import RankingWords from "./RankingWords";

test('renders content', ()=>{
    const component = render(<RankingWords />)
    console.log(component);
})
