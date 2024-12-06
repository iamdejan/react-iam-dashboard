import { Box, Button, Loader, Paper, Select, Table, Title } from "@mantine/core";
import { getRouteApi } from "@tanstack/react-router";
import { JSX, useState } from "react";
import { usePermission, useRolesByTeam } from "../../services/queries";
import Role from "../../types/Role";
import { useAssignRoleToPermission } from "../../services/mutations";

const route = getRouteApi("/permissions/$id");

export default function PermissionDetail(): JSX.Element {
  const { id } = route.useParams();
  const permissionQuery = usePermission(id);
  const rolesQuery = useRolesByTeam(permissionQuery.data?.team);
  const [chosenRole, setChosenRole] = useState<Role | null>(null);
  const assignRoleToPermissionMutation = useAssignRoleToPermission(id);

  const roleRows = permissionQuery.data?.roles.map((role) => (
    <Table.Tr key={role.toString()}>
      <Table.Td>{role.toString()}</Table.Td>
    </Table.Tr>
  ));

  function roleExistsInPermission(roleID: string): boolean {
    if (permissionQuery.isLoading || permissionQuery.data === undefined) {
      return false;
    }

    return Boolean(permissionQuery.data.roles.find((permissionRoleID) => permissionRoleID === roleID));
  }

  const employeeRows = (permissionQuery.isFetched && rolesQuery.isFetched ? (rolesQuery.data ?? []) : [])
    .filter((role) => roleExistsInPermission(role.id))
    .map((role) => role.employees.map((employeeID) => (
      <Table.Tr key={role.toString() + "|" + employeeID}>
        <Table.Td>{role.toString()}</Table.Td>
        <Table.Td>{employeeID}</Table.Td>
      </Table.Tr>
    )));

  function handleRoleSelectionChange(value: string | null): void {
    if (value === null) {
      return;
    }

    const role = rolesQuery.data?.find((role) => role.toString() === value);
    if (role) {
      setChosenRole(role);
    }
  }

  function handleAssignRoleToPermission(): void {
    if (chosenRole !== null) {
      assignRoleToPermissionMutation.mutate(chosenRole);
    }
  }

  return (
    <Box>
      {permissionQuery.isLoading && (
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

      {permissionQuery.isSuccess && (
        <>
          <Title order={1} mb="lg">Permission {permissionQuery.data.toString()}</Title>
          <Paper>
            <Box p="lg">
              <Title order={2}>ID</Title>
              <Box>{permissionQuery.data.id}</Box>
              <Title order={2} mt="lg">Team</Title>
              <Box>{permissionQuery.data.team.toString()}</Box>
              <Title order={2} mt="lg">Assign Roles</Title>
              <Box>
                <Select
                  label="Role"
                  placeholder="Role"
                  value={chosenRole?.toString()}
                  onChange={handleRoleSelectionChange}
                  data={(rolesQuery.data?.map((role) => role.toString()) ?? [])}
                />
                <Button
                  type="button"
                  onClick={handleAssignRoleToPermission}
                  disabled={assignRoleToPermissionMutation.isPending}
                >
                  Assign
                </Button>
              </Box>
              <Title order={2} mt="lg">Roles</Title>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Role ID</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {roleRows}
                </Table.Tbody>
              </Table>
              <Title order={2} mt="lg">Employees</Title>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Role ID</Table.Th>
                    <Table.Th>Employee ID</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {employeeRows}
                </Table.Tbody>
              </Table>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
