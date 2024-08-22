export function validate(fields, required_fields, required_members_fields) {
  let missingFields = [];
  required_fields.forEach((val) => {
    if (!fields.hasOwnProperty(val)) missingFields += val;
  });
  if (missingFields.length != 0) {
    return {
      error: "Not found: " + missingFields.toString(),
    };
  }
  required_members_fields.forEach((val) => {
    Array.from(JSON.parse(fields.members[0])).forEach((element) => {
      if (!element.hasOwnProperty(val)) missingFields += val;
    });
  });
  if (missingFields.length != 0) {
    return {
      error: "Not found: " + missingFields,
    };
  }
}
