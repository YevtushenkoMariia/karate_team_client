export const KarateLevel = {
    KYU_0: "0_KYU",
    KYU_10: "10_KYU",
    KYU_9: "9_KYU",
    KYU_8: "8_KYU",
    KYU_7: "7_KYU",
    KYU_6: "6_KYU",
    KYU_5: "5_KYU",
    KYU_4: "4_KYU",
    KYU_3: "3_KYU",
    KYU_2: "2_KYU",
    KYU_1: "1_KYU",

    DAN_1: "1_DAN",
    DAN_2: "2_DAN",
    DAN_3: "3_DAN",
    DAN_4: "4_DAN",
    DAN_5: "5_DAN",
    DAN_6: "6_DAN",
    DAN_7: "7_DAN",
    DAN_8: "8_DAN",
    DAN_9: "9_DAN",
    DAN_10: "10_DAN",
} as const;

export type KarateLevel =
    typeof KarateLevel[keyof typeof KarateLevel];