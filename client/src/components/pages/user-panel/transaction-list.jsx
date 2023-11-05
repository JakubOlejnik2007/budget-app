import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';

const entries = [
    {
        "_id": "6547c3725372ee6528da5c66",
        "description": "Wypłata za październik",
        "category": {
            "_id": "6547c2f0aeb93e5b528862b7",
            "name": "Pensja",
            "isIncome": true
        },
        "value": 3284.78,
        "who": {
            "_id": "65469677f8af8b5de431bd05",
            "firstName": "Jakub",
            "lastName": "Olejnik"
        },
        "date": "2023-11-05T16:31:46.149Z",
        "budget": "6547b26f3b2e9e8ef6068695",
        "__v": 0
    },
    {
        "_id": "6547c5a6f3de0cb2baa250a4",
        "description": "Wypłata za listopad",
        "category": {
            "_id": "6547c2f0aeb93e5b528862b7",
            "name": "Pensja",
            "isIncome": false
        },
        "value": 3284.78,
        "who": {
            "_id": "65469677f8af8b5de431bd05",
            "firstName": "Jakub",
            "lastName": "Olejnik"
        },
        "date": "2023-11-05T16:41:10.394Z",
        "budget": "6547b26f3b2e9e8ef6068695",
        "__v": 0
    }
];

const EntriesList = () => {
    return (
        <List>
            {entries.map((entry) => (
                <div key={entry._id}>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Box sx={{
                                    display: "flex", justifyContent: "space-between"
                                }}>
                                    <Typography>
                                        {entry.description}
                                    </Typography>
                                    <Typography>
                                        {`(${entry.category.name})`}
                                    </Typography>
                                </Box>}
                            secondary={<Box sx={{
                                display: "flex", justifyContent: "space-between"
                            }}>
                                <Typography>
                                    {new Date (entry.date).toLocaleString()}
                                </Typography>
                                <Typography sx={{
                                    color: entry.category.isIncome ? "green" : "crimson"
                                }}>
                                    {`${(entry.category.isIncome ? 1 : -1) * entry.value} zł`}
                                </Typography></Box>}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );

}

export default EntriesList;
