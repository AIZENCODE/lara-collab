import ActionButton from "@/components/ActionButton";
import BackButton from "@/components/BackButton";
import useForm from "@/hooks/useForm";
import useRoles from "@/hooks/useRoles";
import ContainerBox from "@/layouts/ContainerBox";
import Layout from "@/layouts/MainLayout";
import { redirectTo } from "@/utils/route";
import { getInitials } from "@/utils/user";
import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Divider,
  FileInput,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

const UserCreate = () => {
  const { getDropdownValues } = useRoles();

  const [form, submit, updateValue] = useForm("post", route("users.store"), {
    avatar: null,
    job_title: "",
    name: "",
    phone: "",
    rate: 0,
    email: "",
    password: "",
    password_confirmation: "",
    roles: [],
  });

  return (
    <>
      <Breadcrumbs fz={14} mb={30}>
        <Anchor href="#" onClick={() => redirectTo("users.index")} fz={14}>
          Users
        </Anchor>
        <div>Create</div>
      </Breadcrumbs>

      <Grid justify="space-between" align="flex-end" gutter="xl" mb="lg">
        <Grid.Col span="auto">
          <Title order={1}>Create user</Title>
        </Grid.Col>
        <Grid.Col span="content"></Grid.Col>
      </Grid>

      <ContainerBox maw={600}>
        <form onSubmit={(e) => submit(e, { forceFormData: true })}>
          <Grid justify="flex-start" align="flex-start" gutter="lg">
            <Grid.Col span="content">
              <Avatar
                src={form.data.avatar !== null ? URL.createObjectURL(form.data.avatar) : null}
                size={120}
                color="blue"
              >
                {getInitials(form.data.name)}
              </Avatar>
            </Grid.Col>
            <Grid.Col span="auto">
              <FileInput
                label="Imagen de perfil"
                placeholder="Elige imagen"
                accept="image/png,image/jpeg"
                onChange={(image) => updateValue("avatar", image)}
                clearable
                error={form.errors.avatar}
              />
              <Text size="xs" c="dimmed" mt="sm">
              Si no se carga ninguna imagen, intentaremos obtenerla a través de{" "}
                <Anchor href="https://unavatar.io" target="_blank" opacity={0.6}>
                  unavatar.io
                </Anchor>{" "}
                service.
              </Text>
            </Grid.Col>
          </Grid>

          <TextInput
            label="Nombre"
            placeholder="Nombre completo del usuario"
            required
            mt="md"
            value={form.data.name}
            onChange={(e) => updateValue("name", e.target.value)}
            error={form.errors.name}
          />

          <TextInput
            label="Título profesional"
            placeholder="e.g. Frontend Developer"
            required
            mt="md"
            value={form.data.job_title}
            onChange={(e) => updateValue("job_title", e.target.value)}
            error={form.errors.job_title}
          />

          <MultiSelect
            label="Roles"
            placeholder="Seleccionar roles"
            required
            mt="md"
            value={form.data.roles}
            onChange={(values) => updateValue("roles", values)}
            data={getDropdownValues({ except: ["client"] })}
            error={form.errors.roles}
          />

          <Group grow mt="md">
            <TextInput
              label="Teléfono"
              placeholder="Número de teléfono de las usuarias"
              value={form.data.phone}
              onChange={(e) => updateValue("phone", e.target.value)}
              error={form.errors.phone}
            />

            <NumberInput
              label="Tarifa por hora"
              allowNegative={false}
              clampBehavior="strict"
              decimalScale={2}
              fixedDecimalScale={true}
              prefix="$"
              value={form.data.rate}
              onChange={(value) => updateValue("rate", value)}
              error={form.errors.rate}
            />
          </Group>

          <Divider mt="xl" mb="md" label="Login credentials" labelPosition="center" />

          <TextInput
            label="Email"
            placeholder="Correo electrónico del usuario"
            required
            value={form.data.email}
            onChange={(e) => updateValue("email", e.target.value)}
            onBlur={() => form.validate("email")}
            error={form.errors.email}
          />

          <PasswordInput
            label="Contraseña"
            placeholder="Contraseña de usuario"
            required
            mt="md"
            value={form.data.password}
            onChange={(e) => updateValue("password", e.target.value)}
            error={form.errors.password}
          />

          <PasswordInput
            label="Confirmar Contraseña"
            placeholder="Confirmar Contraseña"
            required
            mt="md"
            value={form.data.password_confirmation}
            onChange={(e) => updateValue("password_confirmation", e.target.value)}
            error={form.errors.password_confirmation}
          />

          <Group justify="space-between" mt="xl">
            <BackButton route="users.index" />
            <ActionButton loading={form.processing}>Crear</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

UserCreate.layout = (page) => <Layout title="Create user">{page}</Layout>;

export default UserCreate;
