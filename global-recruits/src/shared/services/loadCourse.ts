import axios from "axios";
import { BlobStorageUrl } from "../helpers/loadEnvironmentVariables";

const SASToken = "sp=r&st=2023-01-10T09:46:26Z&se=2023-01-10T17:46:26Z&spr=https&sv=2021-06-08&sr=b&sig=tcZHO85eUJk1ecSlSDGNbW0X594PBFvXHM%2BrWOeJcso%3D";

// TODO
export async function loadCourseDetails(courseCode: string): Promise<string> {
    const response = await axios.get(BlobStorageUrl + "/courses/" + courseCode + "/course.xml");
    return response.data;
}