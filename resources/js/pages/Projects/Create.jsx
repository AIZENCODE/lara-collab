import ActionButton from '@/components/ActionButton';
import BackButton from '@/components/BackButton';
import useForm from '@/hooks/useForm';
import ContainerBox from '@/layouts/ContainerBox';
import Layout from '@/layouts/MainLayout';
import { redirectTo } from '@/utils/route';
import {
  Anchor,
  Breadcrumbs,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';

const ProjectCreate = ({ dropdowns: { companies, users, currencies } }) => {
  const [currencySymbol, setCurrencySymbol] = useState();

  const [form, submit, updateValue] = useForm('post', route('projects.store'), {
    name: '',
    description: '',
    rate: 0,
    client_company_id: '',
    users: [],
  });

  useEffect(() => {
    let symbol = currencies.find(i =>
      i.client_companies.find(c => c.id.toString() === form.data.client_company_id)
    )?.symbol;

    if (symbol) {
      setCurrencySymbol(symbol);
    }
  }, [form.data.client_company_id]);

  return (
    <>
      <Breadcrumbs
        fz={14}
        mb={30}
      >
        <Anchor
          href='#'
          onClick={() => redirectTo('projects.index')}
          fz={14}
        >
          Proyectos
        </Anchor>
        <div>Crear</div>
      </Breadcrumbs>

      <Grid
        justify='space-between'
        align='flex-end'
        gutter='xl'
        mb='lg'
      >
        <Grid.Col span='auto'>
          <Title order={1}>Crear proyecto</Title>
        </Grid.Col>
        <Grid.Col span='content'></Grid.Col>
      </Grid>

      <ContainerBox maw={500}>
        <form onSubmit={submit}>
          <TextInput
            label='Nombre'
            placeholder='Nombre del proyecto'
            required
            mt='md'
            value={form.data.name}
            onChange={e => updateValue('name', e.target.value)}
            error={form.errors.name}
          />

          <Textarea
            label='Descripcion'
            placeholder='Descripcion del proyecto'
            mt='md'
            autosize
            minRows={4}
            maxRows={8}
            value={form.data.description}
            onChange={e => updateValue('description', e.target.value)}
          />

          <Select
            label='Empresa que solicita trabajo'
            placeholder='Seleccione empresa'
            required
            mt='md'
            value={form.data.client_company_id}
            onChange={value => updateValue('client_company_id', value)}
            data={companies}
            error={form.errors.client_company_id}
          />

          <MultiSelect
            label="Conceder acceso a las usuarias"
            placeholder="Seleccione usuarios"
            mt='md'
            searchable
            value={form.data.users}
            onChange={(values) => updateValue("users", values)}
            data={users}
            error={form.errors.users}
          />

          <NumberInput
            label='Tarifa por hora'
            mt='md'
            allowNegative={false}
            clampBehavior='strict'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={currencySymbol}
            value={form.data.rate}
            onChange={value => updateValue('rate', value)}
            error={form.errors.rate}
          />

          <Group
            justify='space-between'
            mt='xl'
          >
            <BackButton route='projects.index' />
            <ActionButton loading={form.processing}>Crear</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

ProjectCreate.layout = page => <Layout title='Create project'>{page}</Layout>;

export default ProjectCreate;
