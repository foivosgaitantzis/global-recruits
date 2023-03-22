import { Athlete } from "../data_access/modules/Athlete";
import { Highlight } from "../data_access/modules/Highlight";
import { User } from "../data_access/modules/User";
import { AthleteTeamDetails, StaffTeamDetails } from "../models/getMemberDetails";
import { GetAthleteDetailsResponse, GetStaffDetailsResponse, HeightUnit, WeightUnit } from "../models/GlobalRecruits";

/**
 * Utility Function that Maps Athlete Details to Response
 * @param userDetails The User Object
 * @param athleteDetails The Athlete Object
 * @param teams The Teams (Custom) Object
 * @param highlights The Highlights Object
 * @returns The Mapped DTO
 */
export function mapAthleteDetails(
    userDetails: User,
    athleteDetails?: Athlete,
    teams?: AthleteTeamDetails[],
    highlights?: Highlight[]
): GetAthleteDetailsResponse {
    return {
        type: "athlete",
        data: {
            emailAddress: userDetails.email,
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
 * Utility Function that Maps Staff Details to Response
 * @param userDetails The User Object
 * @param team The Team (Custom) Object
 * @returns The Mapped DTO
 */
export function mapStaffDetails(
    userDetails: User,
    team?: StaffTeamDetails
): GetStaffDetailsResponse {
    return {
        type: "staff",
        data: {
            emailAddress: userDetails.email,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            team
        }
    }
}