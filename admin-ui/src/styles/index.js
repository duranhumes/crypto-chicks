import styled from 'styled-components';

export const Button = styled.button`
    cursor: pointer;
    background: transparent;
    font-size: 1.15rem;
    border-radius: 5px;
    color: #2b6cb0;
    border: 2px solid #2b6cb0;
    margin: 0 1em;
    padding: 1em;
    transition: 0.15s all ease-in-out;
    text-transform: uppercase;
    font-weight: bold;
    width: 100%;

    &:hover {
        background-color: #2b6cb0;
        color: white;
    }
`;

export const Row = styled.div`
    grid-gap: 10px;
    grid-template-columns: repeat(12, 1fr);
    display: grid;
`;

export const Col = styled.div`
    grid-column: span ${props => props.columns};
`;

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Rubik');
    font-family: 'Rubik', sans-serif;
    color: #2d3748;
    width: 100vw;
    height: 100vh;
`;

export const Center = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px;
    display: flex;
    justify-content: ${props => (props.alignTop ? 'flex-start' : 'center')};
    align-items: center;
    flex-direction: column;
`;

export const Top = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #ebf4ff;
    font-size: 1.8rem;
    padding: 1rem 0;
`;

export const Input = styled.input`
    border: 1px solid #f7fafc;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 1.8rem;
    width: 100%;
    outline: none;
    line-height: 1.5;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
    transition: 0.15s all ease-in-out;

    &:hover {
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.25);
    }
`;

export const InputWrapper = styled.div`
    margin: 10px 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

export const Label = styled.label`
    font-size: 1.15rem;
    margin-right: 15px;
    text-transform: uppercase;
    color: #4a5568;
    text-align: right;
    display: inline-block;
    width: 160px;
`;

export const List = styled.ul`
    list-style-type: none;
    width: 100%;
    margin: 5px;
    padding: 15px;
    background: #fff;
`;

export const ListItem = styled.li`
    width: 100%;
    height: 95px;
    padding: 2rem;
    margin-bottom: 30px;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
    transition: 0.15s all ease-in-out;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.2rem;
    line-height: 34px;

    &:hover {
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.25);
    }
`;
