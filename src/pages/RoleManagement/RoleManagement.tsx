import { Box, Button, Loader, Paper, Select, TextInput, Title } from "@mantine/core";
import { JSX } from "react";
import { MRT_ColumnDef, MRT_Table, useMantineReactTable } from "mantine-react-table";
import Role from "../../types/Role";
import { useRoles } from "../../services/queries";
import Team from "../../types/Team";
import { useForm, zodResolver } from "@mantine/form";
import { CreateRole, CreateRoleSchema } from "../../schema/CreateRoleSchema";
import { useCreateRole } from "../../services/mutations";
import { ulid } from "ulid";
import { Link } from "@tanstack/react-router";

export default function RoleManagement(): JSX.Element {
  const rolesQuery = useRoles();
  const createRoleMutation = useCreateRole();

  const columns: Array<MRT_ColumnDef<Role>> = [
    {
      accessorKey: "id",
      header: "ID",
      Cell: ({ renderedCellValue }) => <Link to="/roles/$id" params={{ id: [renderedCellValue ?? ""].toString() }}>{renderedCellValue}</Link>,
    },
    {
      accessorKey: "team",
      header: "Team",
    },
    {
      accessorFn: (role: Role) => role.toString(),
      header: "Role",
    },
  ];

  const fetchedRoles = rolesQuery.data ?? [];

  const table = useMantineReactTable({
    columns,
    data: fetchedRoles,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: true,
      withRowBorders: true,
      striped: false,
    },
  });

  const { onSubmit, key, getInputProps } = useForm<CreateRole>({
    mode: "uncontrolled",
    validate: zodResolver(CreateRoleSchema),
  });

  function handleCreateRole(createRole: CreateRole): void {
    const id = ulid();
    const team: Team = Team[createRole.team as keyof typeof Team];
    const role = new Role(id, team, createRole.role);
    createRoleMutation.mutate(role);
  }

  return (
    <Box>
      <Title order={1}>Role Management</Title>

      <Paper
        p="2rem"
        mt="1rem"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            width: "60%",
          }}
          onSubmit={onSubmit(handleCreateRole)}
        >
          <Title order={3} mb="1rem">
            Create Role
          </Title>
          <Select
            label="Team"
            placeholder="Team"
            data={Object.keys(Team)}
            key={key("team")}
            {...getInputProps("team")}
          />
          <TextInput
            label="Job Role"
            placeholder="Job Role"
            name="role"
            key={key("role")}
            {...getInputProps("role")}
          />

          <Button
            type="submit"
            mt="1rem"
            disabled={createRoleMutation.isPending}
          >
            Create Role
          </Button>
        </form>
      </Paper>

      {rolesQuery.isLoading && (
        <Box
          style={{
            display: "flex",
            width: "100%",
            height: "40vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader id="loader" />
        </Box>
      )}

      {rolesQuery.isFetched && (
        <Paper mt="1rem">
          <MRT_Table table={table} />
        </Paper>
      )}
    </Box>
  );
}
