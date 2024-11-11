import { Box, Loader, Paper, Title } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { JSX } from "react";
import { getRole } from "../../services/functions";
import Role from "../../types/Role";

const route = getRouteApi("/roles/$id");

export default function RoleDetail(): JSX.Element {
  const { id } = route.useParams();
  const queryClient = useQueryClient();
  const roleQuery = useQuery({
    queryKey: ["roles", id],
    queryFn: async () => await getRole(id),
    initialData: (): Role | undefined => {
      return queryClient.getQueryData<Role[] | undefined>(["roles"])?.find((role) => role.id === id);
    },
  });

  return (
    <Box>
      {roleQuery.isLoading && <Loader />}

      {roleQuery.isSuccess && (
        <>
          <Title order={1} mb="lg">Role {roleQuery.data?.id}</Title>
          <Paper>
            <Box p="lg">
              <Title order={2}>Team</Title>
              <Box>{roleQuery.data?.team}</Box>
              <Title order={2} mt="lg">Role</Title>
              <Box>{roleQuery.data?.toString()}</Box>
              <Title order={2} mt="lg">Employees</Title>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
