import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

export interface BankData {
    id: number;
    createdAt: string;
    updatedAt: string;
    age: number;
    job: string;
    marital: string;
    education: string;
    default: string;
    housing: string;
    loan: string;
    contact: string;
    month: string;
    day_of_week: string;
    duration: number;
    campaign: number;
    pdays: number;
    previous: number;
    poutcome: string;
    emp_var_rate: number;
    cons_price_idx: number;
    cons_conf_idx: number;
    euribor3m: number;
    nr_employed: number;
    y: string;
    userId: number;
}

export const BankColumns = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Age",
        accessor: "age",
    },
    {
        Header: "Job",
        accessor: "job",
    },
    {
        Header: "Marital",
        accessor: "marital",
    },
    {
        Header: "Edu",
        accessor: "education",
    },
    {
        Header: "Default",
        accessor: "default",
    },
    {
        Header: "Housing",
        accessor: "housing",
    },
    {
        Header: "Loan",
        accessor: "loan",
    },
    {
        Header: "Contact",
        accessor: "contact",
    },
    {
        Header: "Month",
        accessor: "month",
    },
    {
        Header: "DOW",
        accessor: "day_of_week",
    },
    {
        Header: "Dur",
        accessor: "duration",
    },
    {
        Header: "Campaign",
        accessor: "campaign",
    },
    {
        Header: "Pdays",
        accessor: "pdays",
    },
    {
        Header: "Prev",
        accessor: "previous",
    },
    {
        Header: "Poutcome",
        accessor: "poutcome",
    },
    {
        Header: "EVR",
        accessor: "emp_var_rate",
    },
    {
        Header: "CPI",
        accessor: "cons_price_idx",
    },
    {
        Header: "CCI",
        accessor: "cons_conf_idx",
    },
    {
        Header: "Euribor3m",
        accessor: "euribor3m",
    },
    {
        Header: "NrE",
        accessor: "nr_employed",
    },
    {
        Header: "Y",
        accessor: "y",
    },
];

const BASE_URL = "http://localhost:3333/"
export async function uploadBanksData(data: any[]): Promise<any> {
    const transformedData = data.map((item) => {
        const renamedObject: Record<string, any> = {};
        for (const key in item) {
            const newKey = key.replace(/\./g, "_");
            renamedObject[newKey] = item[key];
        }
        return renamedObject;
    });

    const API_URL = `${BASE_URL}banks/create-multiple`
    try {
        const response = await axios.post(API_URL, transformedData, { headers: authHeader() });
        return response.data;
    } catch (error: any) {

        console.error("Error sending data:", error);
        if (error.response?.data?.statusCode === 401) {
            AuthService.logout();
        }
        throw error;
    }
}

export async function getBanksData(pageNo: number = 1): Promise<{ data: BankData[]; totalRows: number; totalPages: number }> {
    const API_URL = `${BASE_URL}banks/?page=${pageNo}&pageSize=15`

    try {
        const response = await axios.get(API_URL, {
            headers: authHeader(),
        });
        return response.data;
    } catch (error: any) {
        console.error("Error sending data:", error);

        if (error.response?.data?.statusCode === 401) {
            AuthService.logout();
        }
        throw error;
    }
}