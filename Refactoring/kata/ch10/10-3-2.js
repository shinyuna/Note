export function adjustedCapital(instrument) {
  const isNotEligibleForAdjustedCapital = instrument.capital > 0 && instrument.interestRate > 0 && instrument.duration > 0

  if (isNotEligibleForAdjustedCapital) {
    return 0;
  }

  return (instrument.income / instrument.duration) * anInstrument.adjustmentFactor;
}
