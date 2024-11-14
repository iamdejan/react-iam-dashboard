import { Box, Button, Loader, Paper, Table, TextInput, Title } from "@mantine/core";
import { getRouteApi } from "@tanstack/react-router";
import { JSX, useState } from "react";
import { useRole } from "../../services/queries";
import { useAssignEmployeeToRole } from "../../services/mutations";

const route = getRouteApi("/roles/$id");

export default function RoleDetail(): JSX.Element {
  const { id } = route.useParams();
  const roleQuery = useRole(id);
  const assignEmployeeToRoleMutation = useAssignEmployeeToRole(id);
  const [employeeID, setEmployeeID] = useState("");

  const rows = (roleQuery.data?.employees ?? []).map((employeeID) => (
    <Table.Tr key={employeeID}>
      <Table.Td>{employeeID}</Table.Td>
    </Table.Tr>
  ));

  function handleAssignEmployee(): void {
    assignEmployeeToRoleMutation.mutate(employeeID);
  }

  return (
    <Box>
      {roleQuery.isLoading && (
        <Box
          style={{
            display: "flex",
            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      )}

      {roleQuery.isSuccess && (
        <>
          <Title order={1} mb="lg">Role {roleQuery.data.toString()}</Title>
          <Paper>
            <Box p="lg">
              <Title order={2}>ID</Title>
              <Box>{roleQuery.data.id}</Box>
              <Title order={2} mt="lg">Team</Title>
              <Box>{roleQuery.data.team}</Box>
              <Title order={2} mt="lg">Role</Title>
              <Box>{roleQuery.data.toString()}</Box>
              <Title order={2} mt="lg">Assign Employee</Title>
              <Box
                style={{
                  display: "flex",
                  gap: "1rem"
                }}
              >
                <TextInput
                  style={{
                    flexGrow: "1"
                  }}
                  placeholder="Employee ID"
                  value={employeeID}
                  onChange={(event) => setEmployeeID(event.currentTarget.value)}
                />
                <Button
                  type="button"
                  onClick={handleAssignEmployee}
                  disabled={assignEmployeeToRoleMutation.isPending}
                >Assign</Button>
              </Box>
              <Title order={2} mt="lg">Employees</Title>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Employee ID</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rows}
                </Table.Tbody>
              </Table>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
