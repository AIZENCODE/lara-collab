import ActionButton from '@/components/ActionButton';
import BackButton from '@/components/BackButton';
import useForm from '@/hooks/useForm';
import ContainerBox from '@/layouts/ContainerBox';
import Layout from '@/layouts/MainLayout';
import { redirectTo } from '@/utils/route';
import { usePage } from '@inertiajs/react';
import {
  Anchor,
  Breadcrumbs,
  Fieldset,
  Grid,
  Group,
  MultiSelect,
  Select,
  TextInput,
  Title,
} from '@mantine/core';

const ClientCompanyCreate = () => {
  const {
    dropdowns: { clients, countries, currencies },
  } = usePage().props;
  const [form, submit, updateValue] = useForm('post', route('clients.companies.store'), {
    name: '',
    address: '',
    postal_code: '',
    city: '',
    country_id: '',
    currency_id: '',
    email: '',
    phone: '',
    web: '',
    iban: '',
    swift: '',
    business_id: '',
    tax_id: '',
    vat: '',
    clients: route().params?.client_id ? [route().params.client_id] : [],
  });

  return (
    <>
      <Breadcrumbs
        fz={14}
        mb={30}
      >
        <Anchor
          href='#'
          onClick={() => redirectTo('clients.companies.index')}
          fz={14}
        >
          Empresas
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
          <Title order={1}>Crear empresa</Title>
        </Grid.Col>
        <Grid.Col span='content'></Grid.Col>
      </Grid>

      <ContainerBox maw={600}>
        <form onSubmit={submit}>
          <TextInput
            label='Nombre'
            placeholder='Nombre de empresa'
            required
            value={form.data.name}
            onChange={e => updateValue('name', e.target.value)}
            error={form.errors.name}
          />

          <Select
            label='Moneda predeterminada'
            placeholder='Seleccionar moneda'
            required
            mt='md'
            searchable={true}
            value={form.data.currency_id}
            onChange={value => updateValue('currency_id', value)}
            data={currencies}
            error={form.errors.currency_id}
          />

          <MultiSelect
            label='Clientes'
            placeholder='Seleccionar clientes'
            required
            mt='md'
            value={form.data.clients}
            onChange={values => updateValue('clients', values)}
            data={clients}
            error={form.errors.clients}
          />

          <Fieldset
            legend='Ubicación'
            mt='xl'
          >
            <TextInput
              label='Dirección'
              placeholder='Dirección'
              value={form.data.address}
              onChange={e => updateValue('address', e.target.value)}
              error={form.errors.address}
            />

            <Group grow>
              <TextInput
                label='Código Postal'
                placeholder='Código Postal'
                mt='md'
                value={form.data.postal_code}
                onChange={e => updateValue('postal_code', e.target.value)}
                error={form.errors.postal_code}
              />

              <TextInput
                label='Ciudad'
                placeholder='Ciudad'
                mt='md'
                value={form.data.city}
                onChange={e => updateValue('city', e.target.value)}
                error={form.errors.city}
              />
            </Group>

            <Select
              label='País'
              placeholder='Seleccionar País'
              mt='md'
              searchable={true}
              value={form.data.country_id}
              onChange={value => updateValue('country_id', value)}
              data={countries}
              error={form.errors.country_id}
            />
          </Fieldset>

          <Fieldset
            legend='Detalles'
            mt='xl'
          >
            <TextInput
              label='Identificación comercial'
              placeholder='Identificación comercial'
              value={form.data.business_id}
              onChange={e => updateValue('business_id', e.target.value)}
              error={form.errors.business_id}
            />

            <TextInput
              label='Identificación fiscal'
              placeholder='Identificación fiscal'
              mt='md'
              value={form.data.tax_id}
              onChange={e => updateValue('tax_id', e.target.value)}
              error={form.errors.tax_id}
            />

            <TextInput
              label='VAT'
              placeholder='VAT'
              mt='md'
              value={form.data.vat}
              onChange={e => updateValue('vat', e.target.value)}
              error={form.errors.vat}
            />
          </Fieldset>

          <Fieldset
            legend='Finanzas'
            mt='xl'
          >
            <TextInput
              label='IBAN'
              placeholder='IBAN'
              value={form.data.iban}
              onChange={e => updateValue('iban', e.target.value)}
              error={form.errors.iban}
            />

            <TextInput
              label='SWIFT'
              placeholder='SWIFT'
              mt='md'
              value={form.data.swift}
              onChange={e => updateValue('swift', e.target.value)}
              error={form.errors.swift}
            />

            <Select
              label='Moneda predeterminada'
              placeholder='Seleccionar moneda'
              required
              mt='md'
              searchable={true}
              value={form.data.currency_id}
              onChange={value => updateValue('currency_id', value)}
              data={currencies}
              error={form.errors.currency_id}
            />
          </Fieldset>

          <Fieldset
            legend='Contacto'
            mt='xl'
          >
            <Group grow>
              <TextInput
                label='Email'
                placeholder='Email'
                value={form.data.email}
                onChange={e => updateValue('email', e.target.value)}
                error={form.errors.email}
              />

              <TextInput
                label='Teléfono'
                placeholder='Teléfono'
                value={form.data.phone}
                onChange={e => updateValue('phone', e.target.value)}
                error={form.errors.phone}
              />
            </Group>

            <TextInput
              label='Web'
              placeholder='Web'
              mt='md'
              value={form.data.web}
              onChange={e => updateValue('web', e.target.value)}
              error={form.errors.web}
            />
          </Fieldset>

          <Group
            justify='space-between'
            mt='xl'
          >
            <BackButton route='clients.companies.index' />
            <ActionButton loading={form.processing}>Crear</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

ClientCompanyCreate.layout = page => <Layout title='Create company'>{page}</Layout>;

export default ClientCompanyCreate;
