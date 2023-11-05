import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import BudgetSummary from "../pages/user-panel/budget-summary";
import { getUserBudgetsList } from '../../fetchers/apiRequestFunctions';
import { AuthData } from '../../auth/AuthWrapper';
import { useQuery } from "react-query"
import { callError } from "../../utils/toast-notifications/toast"
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropdownMenu = () => {


	const [choosenOption, setChoosenOption] = useState(null);
	const { user } = AuthData();

	const getBudgetsQuery = useQuery("budgetslist", () => getUserBudgetsList(user.id, user.AuthToken), {
		staleTime: 60000,
	});

	useEffect(() => {
		if (getBudgetsQuery.isError)
			switch (getBudgetsQuery.error.response.status) {
				case 401:
					callError("Brak autoryzacji!");
					break;
				case 403:
					callError("Brak dostępu do tej funkcji!");
					break;
				case 400:
					callError("Podany adres email nie może dołączyć do budżetu!");
					break;
				case 422:
					callError("Podano błędne dane!");
					break;
				default:
					callError("Wystapił błąd!");
			}
	}, [getBudgetsQuery]);

	if (getBudgetsQuery.isError)
		return (
			<>
				<h1>Błąd podczas generowania formularza!</h1>
			</>
		);

	if (getBudgetsQuery.isLoading)
		return (
			<>
				<h1>Ładowanie...</h1>
			</>
		);


	const onChange = (e) => {
		setChoosenOption(e.target.value)
	}

	return (
		<div>
			<FormControl
				variant="standard"
				sx={{
					width: "30%",
					margin: "auto",
				}}>
				<InputLabel id="demo-simple-select-standard-label">Budżet</InputLabel>
				<Select
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
					labelId="demo-simple-select-standard-label"
					id="demo-simple-select-standard"
					label="Budżet"
					onChange={onChange}
				>
					{getBudgetsQuery.data.data.map((item, index) => (
						<MenuItem key={index} value={item._id}>
							{item.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{choosenOption ? <BudgetSummary budgetid={choosenOption} /> : ""}
		</div>
	);

}

export default DropdownMenu;