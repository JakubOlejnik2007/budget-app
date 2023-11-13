/* eslint-disable react/prop-types */
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';
import config from '../../../utils/config';

const EntriesList = ({ entries }) => {
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
                            secondary={<Box><Box sx={{
                                display: "flex", justifyContent: "space-between"
                            }}>
                                <Typography>
                                    {new Date(entry.date).toLocaleString()} <br /> {entry.who.firstName}&nbsp;{entry.who.lastName}
                                </Typography>
                                <Typography sx={{
                                    color: entry.category.isIncome ? "green" : "crimson"
                                }}>
                                    {`${(entry.category.isIncome ? 1 : -1) * entry.value}`}&nbsp;zł
                                </Typography></Box>
                                <br />
                                {entry.image ? <img style={{
                                    display: "block",
                                    margin: "0 0 0 auto",
                                }} src={`${config.backend}/uploads/res${entry.image}`} /> : ""}
                            </Box>}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );

}

export default EntriesList;
