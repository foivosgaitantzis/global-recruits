import { Athlete } from "../data_access/modules/Athlete";
import { Highlights } from "../data_access/modules/Highlights";
import { User } from "../data_access/modules/User";
import { AthleteTeamDetails, StaffTeamDetails } from "../models/getMemberDetails";
import { GetAthleteDetailsResponse, GetStaffDetailsResponse, HeightUnit, WeightUnit } from "../models/GlobalRecruits";

export function mapAthleteDetails(
    userDetails: User,
    athleteDetails?: Athlete,
    teams?: AthleteTeamDetails[],
    highlights?: Highlights[]
): GetAthleteDetailsResponse {
    return {
        type: "athlete",
        data: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            dateOfBirth: athleteDetails?.dateOfBirth,
            country: athleteDetails?.country,
            city: athleteDetails?.city,
            height: athleteDetails?.height && athleteDetails.heightUnit
                ? {
                    unit: athleteDetails.heightUnit as HeightUnit,
                    value: athleteDetails.height
                }
                : undefined,
            weight: athleteDetails?.weight && athleteDetails.weightUnit
                ? {
                    unit: athleteDetails.weightUnit as WeightUnit,
                    value: athleteDetails.weight
                }
                : undefined,
            team: teams,
            highlights: highlights?.map(highlight => ({
                id: highlight.highlightId,
                data: highlight.url
            }))
        }
    }
}

/**
 * 
 * @param userDetails 
 * @param team 
 * @returns 
 */
export function mapStaffDetails(
    userDetails: User,
    team?: StaffTeamDetails
): GetStaffDetailsResponse {
    return {
        type: "staff",
        data: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            team
        }
    }
}