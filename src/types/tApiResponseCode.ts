/**
 * Response Status
 */
enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

/**
 * Api https response codes
 */
type tApiResponseCode =
  | ResponseStatus.SUCCESS
  | ResponseStatus.BAD_REQUEST
  | ResponseStatus.UNAUTHORIZED
  | ResponseStatus.NOT_FOUND
  | ResponseStatus.INTERNAL_ERROR;

export default tApiResponseCode;
