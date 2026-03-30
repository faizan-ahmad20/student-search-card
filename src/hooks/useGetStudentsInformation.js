import { useCallback, useState } from "react";

const useStudentInformation = (authenticatedEthosFetch, cardId) => {
  const [loadingStudentInfo, setLoadingStudentInfo] = useState(false);
  const [errorStudentInfo, setErrorStudentInfo] = useState(null);
  const [studentInfoResult, setStudentInfoResult] = useState(null);

  const getStudentInformation = useCallback(
    async ({ firstName, lastName }) => {
      setLoadingStudentInfo(true);
      setErrorStudentInfo(null);

      try {
        const url = `fa-get-student-information?cardId=${encodeURIComponent(cardId)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
        const response = await authenticatedEthosFetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response) {
          throw new Error("No response from server");
        }

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message ||
              response.statusText ||
              "Fetch student information failed",
          );
        }

        setStudentInfoResult(data.studentsList);
        console.log(data, "<--- student information result");
        return data;
      } catch (error) {
        setErrorStudentInfo(
          error instanceof Error ? error.message : String(error),
        );
        throw error;
      } finally {
        setLoadingStudentInfo(false);
      }
    },
    [authenticatedEthosFetch, cardId],
  );

  return {
    getStudentInformation,
    loadingStudentInfo,
    errorStudentInfo,
    studentInfoResult,
  };
};

export default useStudentInformation;
