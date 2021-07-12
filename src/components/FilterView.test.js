import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import FilterView from "./FilterView";

test('renders content', ()=>{
    const component = render(<FilterView />)
    console.log(component);
})
