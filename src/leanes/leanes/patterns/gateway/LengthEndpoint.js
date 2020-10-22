/*
This file is part of LeanRC.

LeanRC is free software: you can redistribute it and/or modify,
it under the terms of the GNU Leser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

LeanRC is destributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with LeanRC. If not, see <https://www.gnu.org/licenses/>.
*/

import { GatewayInterface } from '../../interfaces/GatewayInterface';

export default (Module) => {
  const {
    Endpoint,
    CrudEndpointMixin,
    initialize, module, mixin,
    Utils: { stasuses, joi }
  } = Module.NS;

  const UNAUTHORIZED = stasuses('unauthorized');
  const UPGRADE_REQUIRED = stasuses('upgrade required');

  @initialize
  @mixin(CrudEndpointMixin)
  @module(Module)
  class LengthEndpoint extends Endpoint {
    constructor() {
      super(...arguments);
      this.pathParam('v', this.versionSchema);
      this.response(joi.number(), `
        The length of ${this.listEntityName} collection.
      `);
      this.error(UNAUTHORIZED);
      this.error(UPGRADE_REQUIRED);
      this.summary(`
        Length of ${this.listEntityName} collecton.
      `);
      this.description(`
        Retrieves a length of
        ${this.listEntityName} collection.
      `);
    }
  }
}