## doT

The doT templating language uses `{{}}` for interpolation and javascript execution. Here are some basic uses of doT that we use throughout this tutorial:

<!-- table>(thead>tr>th*3)+tbody>tr*3>td*3 -->
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Interpolation</td>
            <td>{{= expression }}</td>
            <td>Replaces {{= expression }} with the value of the expression</td>
        </tr>
        <tr>
            <td>Conditionals</td>
            <td>
                {{? <condition> }}<br />
                    /* code here*/<br />
                {{?}}<br />
            </td>
            <td>Render the code between the braces when the condition evaluates to true</td>
        </tr>
        <tr>
            <td>Loops</td>
            <td>
                {{~ <array> }}<br />
                    /* code here*/<br />
                {{~}}<br />
            </td>
            <td>Render the code between the braces for each item in array</td>
        </tr>
    </tbody>
</table>
