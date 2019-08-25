import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;
`;

const List = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: ${props => (props.alignRight ? 'flex-end' : 'flex-start')};
    margin: 0 3rem;
`;

const ListItem = styled.li`
    margin: 0 15px;

    a:visited {
        text-decoration: none;
        color: inherit;
    }
`;

export default function Header() {
    return (
        <>
            <ListWrapper>
                <List alignLeft={true}>
                    <ListItem>
                        <Link to="/vendors">Vendors</Link>
                    </ListItem>
                </List>
                <List alignRight={true}>
                    <ListItem>
                        <Link to="/students">Index</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/students/create">Create</Link>
                    </ListItem>
                </List>
            </ListWrapper>
        </>
    );
}
